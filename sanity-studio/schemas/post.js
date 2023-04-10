export default {
  title: 'Post',
  name: 'post',
  type: 'document',
  fields: [
    {
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}], // 누가 작성했니
    },
    {
      title: 'Photo',
      name: 'photo',
      type: 'image', // 어떤 이미지를 올렸니
    },
    {
      title: 'Likes',
      name: 'likes',
      type: 'array', // 누가 좋아요 했니
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
    {
      title: 'Comments',
      name: 'comments',
      type: 'array', // 누가 어떤 댓글을 달았니
      of: [
        {
          title: 'Comment', // comment는 별도로 사용할 수 없음으로 참고하는 것이 아닌 여기서 직접 지정
          name: 'comment',
          type: 'document', // comments는 {author,comment}로 이루어진 배열이다.
          fields: [
            {
              title: 'Author',
              name: 'author',
              type: 'reference',
              to: [{type: 'user'}],
            },
            {
              title: 'Comment',
              name: 'comment',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'comments.0.comment',
      authorName: 'author.name',
      authorUserName: 'author.username',
      media: 'photo',
    },
    prepare(selection) {
      const {title, authorName, authorUserName, media} = selection
      return {
        title,
        media,
        subtitle: `by ${authorName} (${authorUserName})`,
      }
    },
  },
}
