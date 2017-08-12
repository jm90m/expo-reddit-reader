import _ from 'lodash';

class RedditDataParser {
  static getPreviewImage(preview) {
    if (preview) {
      const image = preview.images[0];
      const imageVariants = image.variants || {};

      if (!_.isEmpty(imageVariants.gif)) {
        return image.variants.gif.source.url;
      }

      return image.source.url;
    }
  }

  static formatComments(comments) {
    return comments.map(comment => {
      comment.replies = comment.replies
        ? comment.replies.data.children.map(reply => reply.data).filter(c => c.body)
        : [];
      this.formatComments(comment.replies);
      return comment;
    });
  }
}

export default RedditDataParser;
