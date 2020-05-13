'use strict';
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    uid: DataTypes.STRING,
    title: DataTypes.TEXT,
    thumbnail: DataTypes.TEXT,
    content: DataTypes.TEXT,
    summery: DataTypes.TEXT,
    SectionId: DataTypes.INTEGER,
    ext_link: DataTypes.TEXT,
    image_link: DataTypes.TEXT,
    video_link: DataTypes.TEXT,
    video_name:DataTypes.TEXT,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    type:DataTypes.STRING,
    lang:DataTypes.STRING,
    views:DataTypes.INTEGER,
    keywords:DataTypes.TEXT,
    commentCount:DataTypes.INTEGER,
    badge: DataTypes.STRING,
  }, {});
  Posts.associate = function(models) {
    // associations can be defined here
    Posts.belongsTo(models.Sections,{foreignKey: 'SectionId'});
    Posts.belongsTo(models.Users);
    Posts.hasMany(models.TagMaps);
    Posts.hasMany(models.Landing);
    Posts.hasOne(models.Random)
    Posts.hasOne(models.Reactions)
    Posts.hasMany(models.Comments)
  };
  return Posts;
};