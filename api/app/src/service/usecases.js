
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const modify = {
  async interacao(metodo, data, query, path) {
    // path será o nome do modelo Prisma, ex: 'user' ou 'produto'
    const model = prisma[path];
    if (!model) {
      return 'No resource Found\n';
    }
    switch (metodo) {
      case 'GET':
        if (Object.keys(query).length === 0) {
          return await model.findMany();
        } else {
          // Prisma aceita where com vários campos
          return await model.findMany({ where: query });
        }
      case 'POST':
        // data pode ser um array ou objeto
        // Função auxiliar para checar duplicidade
        async function existsUnique(model, item) {
          // Para cada campo único do schema, verifica se já existe
          // Exemplo: para User, verifica email; para Tenant, verifica name
          if (path === 'user' && item.email) {
            const found = await model.findUnique({ where: { email: item.email } });
            return !!found;
          }
          if (path === 'tenant' && item.name) {
            const found = await model.findUnique({ where: { name: item.name } });
            return !!found;
          }
          if (path === 'application' && item.name && item.tenantId) {
            // Exemplo: nome + tenantId pode ser único
            const found = await model.findFirst({ where: { name: item.name, tenantId: item.tenantId } });
            return !!found;
          }
          return false;
        }

        if (Array.isArray(data)) {
          const results = [];
          for (const item of data) {
            if (await existsUnique(model, item)) {
              results.push({ error: 'Item já existe', item });
            } else {
              try {
                const created = await model.create({ data: item });
                results.push(created);
              } catch (err) {
                results.push({ error: err.message, item });
              }
            }
          }
          return { status: 201, data: results };
        } else {
          if (await existsUnique(model, data)) {
            return { status: 409, data: { error: 'Item já existe', item: data } };
          }
          try {
            const created = await model.create({ data });
            console.log('Criado:', { id: created.id, ...created });
            return { status: 201, data: created };
          } catch (err) {
            return { status: 400, data: { error: err.message, item: data } };
          }
        }
      case 'DELETE':
        if (Object.keys(query).length === 0) {
          // Deleta todos
          const deleted = await model.deleteMany({});
          console.log('Todos deletados:', deleted);
          return { status: 200, data: deleted };
        } else {
          // Deleta por filtro
          const deleted = await model.deleteMany({ where: query });
          console.log('Deletados por filtro:', deleted);
          return { status: 200, data: deleted };
        }
      case 'PUT':
        // Atualiza todos que batem com query
        const updated = await model.updateMany({ where: query, data });
        console.log('Atualizados:', updated);
        return { status: 200, data: updated };
      case 'PATCH':
        // PATCH: atualiza apenas campos existentes
        // Aqui, para simplificar, faz igual ao PUT
        const patched = await model.updateMany({ where: query, data });
        console.log('Patch realizados:', patched);
        return { status: 200, data: patched };
      default:
        return { status: 400, data: 'Método inválido' };
    }
  }
};

module.exports = modify;