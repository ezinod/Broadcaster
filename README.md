 ## Clone my repository for this backend
```
https://github.com/ezinod/my-diary
```
```
> npm install
```

## Run the server
```
> npm start
```

## API Endpoints

| Request Url | Methods  | Description  |
| ------- | --- | --- |
| /api/v1/signup | POST | Create user account |
| /api/v1/signin | POST | User Login  |
| /api/v2/post/create | POST | User can add diary |
| /api/v2/post/<postId> | DELETE | delete a specific diary |
| /api/v2/post/<postId> | PUT | User can update a specific story |
| /api/v1/post/<storyId> | GET | user can get a single story |


## Samples of request format
```
    /api/v1/signup | POST

    {
        "firstName": "Niyomugabo",
        "lastName": "Olivier",
        "Email": "nivierlos@gmail.com",
        "Password": "123456"
    }
    /api/v1/signin | POST

    {
        "Email": "nivierlos@gmail.com",
        "Password": "123456"
    }
    /api/v2/post/create | POST

    {
        "post_id":"5dd9d10d05027e4a5cb7952c",
        "Subject": "my first post about interventions",
        "category": "red-flag",
        "status": "draft",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia nisi quis dapibus porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sed arcu in lacus egestas aliquet eget in dolor. Sed sollicitudin, dolor eget auctor tristique, libero ligula dignissim dolor, ac posuere nunc risus quis orci. Maecenas ut mauris ut purus volutpat condimentum. Vestibulum quam metus, fermentum sed turpis ut, gravida congue orci. Suspendisse lorem magna, lacinia eu nisl sit amet, fermentum vestibulum diam. In maximus porta purus non feugiat. Aenean nec tellus laoreet, finibus neque sed, pellentesque tortor. Mauris id nisl convallis, semper purus vel, vulputate tellus. Nullam consectetur leo mauris, vel accumsan lorem venenatis ac. Aliquam erat volutpat. Nulla tristique neque nibh, vel lobortis ante pretium at. Cras eu enim luctus ligula consectetur consectetur. Nulla vel varius tortor, id laoreet libero.",
        "image_url": "https://scontent.fkgl1-1.fna.fbcdn.net/v/t45.1600-4/cp0/q90/spS444/p296x100/78181995_6163893471150_2285179865718063104_n.png.jpg?_nc_cat=101&_nc_ohc=ra_C1vV7Y38AQn6apf8ubt6dEtLQe-VFYFTanhPN7w7TRqqyH729cWtUA&_nc_ht=scontent.fkgl1-1.fna&oh=df02d93402593e36cc856e6270a8122c&oe=5E4F1D29"
        "user_id": "123hnbffyussx42",
    }



```
### UI Link Example
[My diary UI](https://ezinod.github.io/Broadcaster/)

## Tools Used

    ### Back End
    * Node Js

    ### Framework
    * Express

    ### User Interface (UI)
    * HTML
    * CSS
    * Javascript

    ### Deployment
    ```
    Heroku
    ```
### Heroku link
https://prebootcamp-challenge-2.herokuapp.com/

## Author
- Olivier Niyomugabo <nivierlos@gmail.com>
---