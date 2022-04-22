# Tenrun Server

server API for Tenrun web app

## API
### User

#### check if userId exist
`get(‘/api/user’) `

- send:
```javascript
{'id': String}
```

- success return:
```javascript
{'_id': ObjectId}
```
- fail return:
```javascript
{'status': Number, 'error': String}
```

#### add new user
`post(‘/api/user’)`
- send: 
```javascript
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
```javascript
{'status': 'Register successfully'}
```
- fail return: 
```javascript
{'status': Number, 'error': String}
```


#### Create login token
`post(‘/api/user/login’)`
- send:
```javascript
{
    'email': String,
    'password': String
}
```

- success return:
```javascript
{'_id': ObjectId}
```
- fail return:
```javascript
{'status': Number, 'error': String}
```

#### Verify login token
`get(‘/api/user/verify’)`
- send:
```javascript
{
    'userId': String,
    'token': String
}
```

- success return:
```javascript
true
```
- fail return:
```javascript
false
```

------------


### Activity Histories
#### Get user activities
`get(‘/api/history’)`
- send:
```javascript
{
    'userId': Number,
    'token': Number
    'page': Number,
    'activitiesFilter': String //string of date, optional
}
```

- success return:
```javascript
{
    'count': Number, //number of activities
    'data': Array
}
```
- fail return:
```javascript
{'status': Number, 'error': String}
```

#### Add new activity
`post(‘/api/history’)`

- send:
```javascript
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
```javascript
{'status': 'add activity successfuly'}
```
- fail return:
```javascript
{'status': Number, 'error': String}
```

#### Update activity
`put(‘/api/history’)`

- send:
```javascript
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
```javascript
{'status': 'update activity successfuly'}
```
- fail return:
```javascript
{'status': Number, 'error': String}
```

#### Remove activity
`delete(‘/api/history’)`

- send:
```javascript
{
    'userId': String,
    'token': String,
    'removeId': String
}

```


- success return:
```javascript
{'status': 'remove activity successfuly'}
```
- fail return:
```javascript
{'status': Number, 'error': String}
```

#### Get user summary
`get(‘/api/history/summary/’)`
- send:
```javascript
{_
    'userId': Number,
    'token': Number
}
```

- success return:
```javascript
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
```javascript
{'status': Number, 'error': String}
```
