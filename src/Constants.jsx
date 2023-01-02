let CORS_PROXY= 'https://cors-proxy-kyez.onrender.com',
 LEETCODE_USER = 'manral',
 LEETCODE_GRAPHQL = 'https://leetcode.com/graphql',
 STOPSTALK = {
    USER_ID: '91752'
},
TAGS_TO_DISPLAY = {
    array: 'Array',
    dynamicprogramming: 'Dynamic Programming',
    binarysearch: 'Binary Search',
    greedy: 'Greedy',
    tree:'Trees',
    trees: 'Trees',
    graph:'Graphs',
    graphs: 'Graphs',
    math: 'Math',
    string: 'Strings',
    strings: 'Strings',
    bitmanipulation: 'Bit Manipulation',
    miscellaneous: 'Miscellaneous'
},
GITHUB_ALL = "https://api.github.com/users/manralhemant10/repos"


STOPSTALK.USER_STATS_URL = `https://www.stopstalk.com/user/get_stopstalk_user_stats.json?user_id=${STOPSTALK.USER_ID}&custom=False`
STOPSTALK.TAGS_URL = `https://www.stopstalk.com/user/get_solved_unsolved.json?user_id=${STOPSTALK.USER_ID}&custom=False`

export default {
    CORS_PROXY,
    LEETCODE_USER,
    LEETCODE_GRAPHQL,
    STOPSTALK,
    TAGS_TO_DISPLAY,
    GITHUB_ALL
}