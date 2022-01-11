const { Types } = require('mongoose');
const Posts = require('../schemas/Posts');
const Users = require('../schemas/Users');
const Tags = require('../schemas/Tags');

const utilsService = require('../services/utils.service');

class PostRepository {
  constructor(options) {
    this.postModel = options.postModel;
    this.userModel = options.userModel;
    this.tagsModel = options.tagsModel;
  }

  getPostsList(options) {
    const { perPage, page, skip, sort } = utilsService.prepareAggregateData(options);
    const pipeline = this.stepsForAggregatePosts(perPage, page, skip, sort);
    pipeline.unshift({
      $lookup: {
        from: 'tags',
        localField: 'tags',
        foreignField: '_id',
        as: 'tags',
      },
    });

    return new Promise(async (resolve, reject) => {
      this.postModel.aggregate(pipeline).exec(async (err, pagination) => {
        if (err) {
          return reject(err);
        }
        return pagination.length ? resolve(pagination.pop()) : resolve({ page, pages: 0, countItems: 0, entities: [] });
      });
    });
  }

  getPostById(postId) {
    return new Promise((resolve, reject) => {
      this.postModel
        .aggregate([
          {
            $lookup: {
              from: 'tags',
              localField: 'tags',
              foreignField: '_id',
              as: 'tags',
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'author',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $match: {
              _id: Types.ObjectId(postId),
            },
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
        ])
        .exec(async (err, post) => {
          if (err) {
            return reject(err);
          }
          return resolve(post);
        });
    });
  }

  updatePost(postId, options) {
    let { title, subtitle, text, tags } = options;

    return new Promise(async (resolve, reject) => {
      if (tags) {
        tags = await this.tagsModel.aggregate([
          {
            $match: {
              title: {
                $in: tags,
              },
            },
          },
        ]);
      }

      if (!tags) {
        tags = [];
      }

      const matchedTags = await this.tagsModel.aggregate([
        {
          $match: {
            title: {
              $in: tags,
            },
          },
        },
      ]);

      this.postModel
        .updateOne(
          { _id: postId },
          {
            $set: {
              title: title,
              subtitle: subtitle,
              text: text,
              tags: matchedTags,
            },
          },
        )
        .then(
          async _ => {
            let updatedPost = await this.getPostById(postId);
            return resolve(updatedPost);
          },
          err => {
            return reject({ message: `Error on update post: ${postId}` });
          },
        );
    });
  }

  createPost(post) {
    return new Promise(async (resolve, reject) => {
      const postAlreadyCreated = await Posts.exists({ title: post.title, subtitle: post.subtitle, text: post.text });

      if (postAlreadyCreated) {
        return reject({ message: 'Post already exist' });
      }

      if (!post.tags) {
        post.tags = [];
      }

      if (post.tags) {
        post.tags = await this.tagsModel.aggregate([
          {
            $match: {
              title: {
                $in: post.tags,
              },
            },
          },
        ]);
      }

      if (!post.author) {
        const author = await this.userModel
          .aggregate([
            {
              $project: {
                _id: 1,
              },
            },
          ])
          .sample(1);

        post.author = Types.ObjectId(author[0]._id);
      }

      const newPost = await new this.postModel(post).save();

      const newPreparedPost = await this.getPostById(newPost._id);

      return resolve(newPreparedPost);
    });
  }

  deletePost(postId) {
    return new Promise((resolve, reject) => {
      this.postModel.findByIdAndRemove(postId).then(res => {
        if (!res) {
          return reject({ message: `No post with id: ${postId}` });
        }
        return resolve(res);
      });
    });
  }

  getPostsByTag(options) {
    const { perPage, page, skip, sort } = utilsService.prepareAggregateData(options);

    const pipeline = this.stepsForAggregatePosts(perPage, page, skip, sort);
    pipeline.unshift(
      { $unwind: '$tags' },
      {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags',
        },
      },
      {
        $match: {
          tags: {
            $elemMatch: { title: options.tag },
          },
        },
      },
    );

    return new Promise(async (resolve, reject) => {
      this.postModel.aggregate(pipeline).exec(async (err, pagination) => {
        if (err) {
          return reject(err);
        }
        return pagination.length ? resolve(pagination.pop()) : resolve({ page, pages: 0, countItems: 0, entities: [] });
      });
    });
  }

  stepsForAggregatePosts = (perPage, page, skip, sort) => {
    return [
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'user',
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
    ];
  };
}

module.exports = new PostRepository({
  postModel: Posts,
  userModel: Users,
  tagsModel: Tags,
});
