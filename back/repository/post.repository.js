const Posts = require('../schemas/Posts');
const utilsService = require('../services/utils.service');

class PostRepository {
  constructor(options) {
    this.postModel = options.postModel;
  }

  async getPostsList(options) {
    const { perPage, page, skip, sort } = utilsService.prepareAggregateData(options);

    return new Promise(async (resolve, reject) => {
      this.postModel
        .aggregate([
          {
            $lookup: {
              from: 'users',
              localField: 'author',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $lookup: {
              from: 'tags',
              localField: 'tags',
              foreignField: '_id',
              as: 'tags',
            },
          },
          { $sort: sort },
          {
            $facet: {
              total: [
                {
                  $count: 'count',
                },
              ],
              items: [
                {
                  $skip: skip,
                },
                {
                  $limit: perPage,
                },
                {
                  $project: {
                    _id: 0,
                    id: '$_id',
                    title: '$title',
                    subtitle: '$subtitle',
                    text: '$text',
                    author: { $arrayElemAt: ['$user.name', 0] },
                    date: '$updatedAt',
                    likes: '$likes',
                    tags: '$tags.title',
                  },
                },
              ],
            },
          },
          {
            $unwind: {
              path: '$total',
            },
          },
          {
            $project: {
              page: page.toString(),
              pages: {
                $ceil: {
                  $divide: ['$total.count', perPage],
                },
              },
              countItems: '$total.count',
              entities: '$items',
            },
          },
        ])
        .exec(async (err, pagination) => {
          if (err) {
            return reject(err);
          }
          return pagination.length
            ? resolve(pagination.pop())
            : resolve({ page, pages: 0, countItems: 0, entities: [] });
        });
    });
  }

  async getPostById(options) {
    const { postId } = options;

    const post = await this.postModel.findById(postId);
    console.log('post', post);
    return post;
  }
}

module.exports = new PostRepository({
  postModel: Posts,
});
