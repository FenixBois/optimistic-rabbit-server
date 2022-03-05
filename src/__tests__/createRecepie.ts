import { createRecepie } from '../functions/createRecepie';
import { prismaMock } from '../singleton';

// valid test
test('createRecepie', async () => {
    const recepie = {
        title: 'test',
        content: 'test',
    };
    await createRecepie(recepie);
    expect(prismaMock.recepie.create).toHaveBeenCalledWith({
        data: recepie,
    });
});

// test('should create new user ', async () => {
//     const recepie = {
//         id: 123,
//         title: 'hello@prisma.io',
//         content: 'Rich',
//         createdAt: new Date(),
//         categories: [],
//         published: false,
//     };

//     prismaMock.recepie.create.mockResolvedValue(recepie);
//     console.log(await createRecepie(recepie));
//     await expect(createRecepie(recepie)).resolves.toEqual({
//         id: 123,
//         name: 'Rich',
//         email: 'hello@prisma.io',
//     });
// });
