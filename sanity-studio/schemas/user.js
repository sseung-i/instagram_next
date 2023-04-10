export default {
  title: 'User', // 스키마(데이터 모델)의 이름
  name: 'user',
  type: 'document',
  fields: [
    {
      title: 'Username', // 스튜디오에서 보는 이름
      name: 'username', // 실제 backend(data)에서 보는 key 이름
      type: 'string', // 데이터 타입
    },
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'string',
    },
    {
      title: 'Following',
      name: 'following',
      type: 'array', // 내가 팔로잉 하고 있는 유저의 배열
      of: [
        {
          type: 'reference', // 다른 레퍼런스를 참고할꺼다
          to: [{type: 'user'}], // 어떤 레퍼런스? 다른 사용자!
        },
      ],
      validation: (Rule) => Rule.unique(), // 유일하게 사용할거다 (배열 내의 중복데이터 삭제)
    },
    {
      title: 'Followers',
      name: 'followers',
      type: 'array', // 나를 팔로잉 하고 있는 유저의 배열
      of: [
        {
          type: 'reference', // 다른 레퍼런스를 참고할꺼다
          to: [{type: 'user'}], // 어떤 레퍼런스? 다른 사용자!
        },
      ],
      validation: (Rule) => Rule.unique(), // 유일하게 사용할거다 (배열 내의 중복데이터 삭제)
    },
    {
      title: 'Bookmarks',
      name: 'bookmarks',
      type: 'array',
      of: [
        {
          type: 'reference', // 다른 레퍼런스를 참고할꺼다
          to: [{type: 'post'}], // 어떤 레퍼런스? 포스트!
        },
      ],
      validation: (Rule) => Rule.unique(), // 유일하게 사용할거다 (배열 내의 중복데이터 삭제)
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'username',
    },
  },
}
