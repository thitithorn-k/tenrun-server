# Tenrun Server

server API for Tenrun web app

## API
### User

#### check if userId exist
`get(‘/api/user’) `

- send:
```
{'id': String}
```

- success return:
```
{'_id': ObjectId}
```
- fail return:
```
{'status': Number, 'error': String}
```

#### add new user
`post(‘/api/user’)`
- send: 
```
{
    'email': String,
    'password': String,
    'gender': String,
    'weight': Number,
    'height': Number,
    'dob': Date,
}
```

- success return: 
```
{'status': 'Register successfully'}
```
- fail return: 
```
{'status': Number, 'error': String}
```


#### Create login token
`post(‘/api/user/login’)`
- send:
```
{
    'email': String,
    'password': String
}
```

- success return:
```
{'_id': ObjectId}
```
- fail return:
```
{'status': Number, 'error': String}
```

#### Verify login token
`get(‘/api/user/verify’)`
- send:
```
{
    'userId': String,
    'token': String
}
```

- success return:
```
true
```
- fail return:
```
false
```

------------


### Activity Histories
#### Get user activities
`get(‘/api/history’)`
- send:
```
{
    'userId': Number,
    'token': Number
    'page': Number,
    'activitiesFilter': String //string of date, optional
}
```

- success return:
```
{
    'count': Number, //number of activities
    'data': res //Array of activities
}
```
- fail return:
```
{'status': Number, 'error': String}
```

#### Add new activity
`post(‘/api/history’)`

- send:
```
{
    'userId': String,
    'token': String,
    'addData': {
        'name': String,
        'detail': String,
        'activity_type': String,
        'data': Date,
        'duration': Number
    }
}
```

- success return:
```
{'status': 'add activity successfuly'}
```
- fail return:
```
{'status': Number, 'error': String}
```

#### Update activity
`put(‘/api/history’)`
```
{
    'userId': String,
    'token': String,
    'data': {
        'name': String,
        'detail': String,
        'activity_type': String,
        'data': Date,
        'duration': Number
    }
}

```


- success return:
```
{'status': 'update activity successfuly'}
```
- fail return:
```
{'status': Number, 'error': String}
```

#### Remove activity
`delete(‘/api/history’)`
```
{
    'userId': String,
    'token': String,
    'removeId': String
}

```


- success return:
```
{'status': 'remove activity successfuly'}
```
- fail return:
```
{'status': Number, 'error': String}
```

#### Get user summary
`get(‘/api/history/summary/’)`
- send:
```
{_
    'userId': Number,
    'token': Number
}
```

- success return:
```
{
    'today': [
        {
            '_id': $activity_type,
            'duration': Number,
            'count': Number,
        }
    ],
    'seven': [
        {
            '_id': $activity_type,
            'duration': Number,
            'count': Number,
        }
    ],
    'month': [
        {
            '_id': $activity_type,
            'duration': Number,
            'count': Number,
        }
    ],
}
```
- fail return:
```
{'status': Number, 'error': String}
```
