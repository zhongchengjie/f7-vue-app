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
    	add:"insert into m_share (share_id,share_content,share_photo,create_time,create_user) values (UUID(),?,?,now(),?)",
    	queryAll:"select share.*,u.* from  m_share share,m_user u where share.create_user = u.user_id order by share.create_time desc;",
        detail:"select * from m_share where share_id=?",
        updateLikeNum:"update m_share set like_num=like_num+1 where share_id=?",
        updateFavorNum:"update m_share set favor_num=favor_num+1 where share_id=?"
    },
    favor:{
    	add:"insert into m_favorite (favorite_id,user_id,share_id,create_time) values (UUID(),?,?,now())",
    }
}

module.exports = sqlMap;