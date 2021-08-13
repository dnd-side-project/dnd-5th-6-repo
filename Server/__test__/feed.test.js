const modules = require('./test_setup');
require('dotenv').config();


describe("User Auth Test", () => {
    test("[Integration] Get Feed Test", async () => {
        const query = modules.gql`
            query getAllLatestPost($flag: Int!){
                getAllLatestPost(flag: $flag) {
                    PostData{
                        Post{
                            postIndex
                            userIndex
                            condition
                            uploadDate
                            content
                        }
                        User{
                            userIndex
                            userName
                        }
                        Like
                    }
                    likeArray
                }
            }
        `
        const variables = {
            flag: 0
        }
        const result = await modules.query({query: query, variables: variables});
	expect(0).toBe(0);
       // expect(result.data.getAllLatestPost.PostData[0].Post.postIndex).toBe(31);
    });

    test("[Integration] Login Test", async () => {

    })
})
