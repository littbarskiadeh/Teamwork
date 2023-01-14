let image = '../db/gifs/giphy.gif'

let testEmployee = {
    firstname: "Test",
    lastname: "User",
    username: "testuser",
    email: "testuser@mail.com",
    password: "test",
    usertype: "2",
    gender: "male",
    jobrole: "HR Admin",
    department: "HR",
    address: "Maple Street, Toronto"
}

let testEmployee2 = {
    firstname: "Test2",
    lastname: "User2",
    username: "testuser2",
    email: "testuser2@mail.com",
    password: "test2",
    usertype: "2",
    gender: "female",
    jobrole: "HR",
    department: "HR",
    address: "Maple Street, Toronto"
}

let testAdmin = {
    firstname: "Test",
    lastname: "Admin",
    username: "testadmin",
    email: "testadmin@mail.com",
    password: "test",
    usertype: "1",
    gender: "male",
    jobrole: "Admin",
    department: "IT",
    address: "Maple Street, Toronto"
}

let testArticle = {
    "title": "Lorem ipsum dolor amet sit",
    "article": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborumnumquam blanditiis arum quisquam eius sed odit fugiat iusto fuga praesentiumoptio, eaque rerum! Provident similique accusantium nemo autem. Veritatisobcaecati tenetur iure eius earum ut molestias architecto voluptate aliquamnihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos"
}

let testGif = {
    "title": "Lorem ipsum Image",
    "file": image
}

let testComment = {
    "comment": "This is a comment from Unit testing!"
}

let testArticleUpdate = {

    title: "Test Title",
    article: "Test Article, Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborumnumquam blanditiis arum quisquam eius se"
}

let fakeToken = 'eyJhbRciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjJjZTNkY2EtNjQwMi00MjViLTk3OTYtY2UwMjg1NjdjOWE0IiwiaWF0IjoxNjcwMjk1Njg0LCJleHAiOjE2NzA5MDA0ODR9.FD02UCwAOvUCvuIAwv9LdTTzMxo5F7g_1IuEiB3qnYU';

module.exports = {
    testAdmin,
    testEmployee,
    testEmployee2,
    testArticle,
    testGif,
    testComment,
    testArticleUpdate,
    image,
    fakeToken
}