/**
 * Created by zcj on 2017/7/13.
 */
// sql语句
var sqlMap = {
    // 用户
    user: {
        query: 'select * from m_user',
        login: 'select * from m_user where user_mobile=? and user_pwd=?'
    }
}

module.exports = sqlMap;