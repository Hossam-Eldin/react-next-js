'use strict';
const Dummy = require('dummyjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    let Posts = [];
    //imageLink
    for (let i = 0; i < 10; i++) {
      Posts.push({
        title: Dummy.text(4, 6),
        image_link: 'https://blog.hubspot.com/hubfs/best-time-to-post-on-instagram-2.jpg',
        type: 'Image_Link',
        status: 'published',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    //post type 
    for (let i = 0; i < 10; i++) {
      Posts.push({
        title: Dummy.text(1),
        summery: Dummy.text(),
        type: 'post',
        status: 'published',
        image_link: 'https://blog.hubspot.com/hubfs/best-time-to-post-on-instagram-2.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

    }

    //externalLink
    for (let i = 0; i < 10; i++) {
      Posts.push({
        title: Dummy.text(1),
        summery: Dummy.text(),
        type: 'external_Link',
        status: 'published',
        ext_link: 'https://www.reddit.com/',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    //video_link
    for (let i = 0; i < 10; i++) {
      Posts.push({
        title: Dummy.text(4, 8),
        summery: Dummy.text(),
        type: 'Video_Link',
        status: 'published',
        ext_link: 'https://www.youtube.com/embed/bUhDcwgun9M',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    //for random badges
    let badges = ['funny', ' geeky', 'cool', 'omg', 'wtf', 'cute', 'lovely']
    let badge = badges[Math.floor(Math.random() * badges.length)];

    //articles
    for (let i = 0; i < 10; i++) {
      Posts.push({
        title: Dummy.text(5, 8),
        summery: Dummy.text(),
        type: 'Article',
        content: `<h2 style="text-align:justify;">What is Lorem Ipsum?</h2>
        <p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        <p>&nbsp;It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <p>&nbsp;It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.&nbsp;</p>
        <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
        <img src="https://www.w3schools.com/howto/img_snow.jpg" alt="undefined" style="float:left;height: auto;width: 100%"/>
        <p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.&nbsp;</p>
        <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.&nbsp;</p>
        <p>The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)</p>
        `,
        status: 'published',
        thumbnail: 'bg5.jpg',
        keywords: 'krien mr lorem something Lorem Ipsum is simply dummy text of the printing',
        badge: badges[Math.floor(Math.random() * badges.length)],
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }





    return queryInterface.bulkInsert('Posts', Posts);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Posts', null, {});

  }
};