/**
 * Created by zcj on 2017/7/13.
 */
// sql语句
var sqlMap = {
    // 用户
    user: {
        query: 'select * from m_user',
        login: 'select * from m_user where user_mobile=? and user_pwd=?',
        register:'insert into m_user (user_id,user_name,user_mobile,user_pwd) values (?,?,?,?)',
        modify:'update m_user set user_pwd=? where user_id=?'
    },
    share:{
    	add:"insert into m_blog (blog_id,blog_content,blog_photo,create_time,create_user) values (UUID(),?,'',now(),?)",
    	queryAll:"select blog.*,u.* from  m_blog blog,m_user u where blog.create_user = u.user_id;"
    }
}

module.exports = sqlMap;