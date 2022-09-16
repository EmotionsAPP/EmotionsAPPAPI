export const createArticle: any = {
    title: 'a title',
    body: 'a body',
    psychologist: '1'
};

export const createdArticle = { 
    _id: expect.any(String),
    isActive: true, 
    populate: jest.fn(),
    updateOne: jest.fn(),
    toObject: jest.fn().mockImplementation(() => ({...createdArticle})),
    createdAt: expect.any(String),
    updateAt: expect.any(String),
    ...createArticle
};

export const updateArticle = { title: 'new title' };

export const updatedArticle = { ...createdArticle, title: 'new title' };