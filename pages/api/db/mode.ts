import { Sequelize, DataTypes } from 'sequelize'
const sequelize = new Sequelize('sqlite::memory:')

const Note = sequelize.define('User', {
    // 在这里定义模型属性
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING
    },
    createTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
})

const Tag = sequelize.define('User', {
    // 在这里定义模型属性
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
})

const TagNote = sequelize.define('User', {
    // 在这里定义模型属性
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    noteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

