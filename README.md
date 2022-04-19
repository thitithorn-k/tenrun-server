# Tenrun Server

server API for Tenrun web app

## API
### User

#### check if userId exist
`get(‘/api/user’) `

- send:
```json
{'id': String}
```
- return:
-- success:
```json
{'_id': ObjectId}
```
-- fail:
```json
{'status': Number, 'error': String}
```

#### add new user
`post(‘/api/user’)`
- send: 
```json
{
    'email': String,
    'password': String,
    'gender': String,
    'weight': Number,
    'height': Number,
    'dob': Date,
}
```
- return:
-- success: 
```json
{'status': 'Register successfully'}
```
-- fail: 
```json
{'status': Number, 'error': String}
```


#### Create login token
`post(‘/api/user/login’)`
- send:
```json
{_
    'email': String,
    'password': String
}
```
- return:
-- success:
```json
{'_id': ObjectId}
```
-- fail:
```json
{'status': Number, 'error': String}
```

#### Verify login token
`get(‘/api/user/verify’)`
- send:
```json
{_
    'userId': String,
    'token': String
}
```
- return:
-- success:
```json
true
```
-- fail:
```json
false
```

------------


### Activity Histories
#### Get user activities
`get(‘/api/history’)`
- send:
```json
{_
    'userId': Number,
	'token': Number
	'page': Number,
	'activitiesFilter': String //string of date, optional
}
```
- return:
-- success:
```json
{
    'count': Number, //number of activities
    'data': res //Array of activities
}
```
-- fail:
```json
{'status': Number, 'error': String}
```

#### Add new activity
`post(‘/api/history’)`

- send:
```json
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
- return:
-- success:
```json
{'status': 'add activity successfuly'}
```
-- fail:
```json
{'status': Number, 'error': String}
```

#### Update activity
`put(‘/api/history’)`
```json
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

- return:
-- success:
```json
{'status': 'update activity successfuly'}
```
-- fail:
```json
{'status': Number, 'error': String}
```

#### Remove activity
`delete(‘/api/history’)`
```json
{
	'userId': String,
	'token': String,
	'removeId': String
}

```

- return:
-- success:
```json
{'status': 'remove activity successfuly'}
```
-- fail:
```json
{'status': Number, 'error': String}
```

#### Get user summary
`get(‘/api/history/summary/’)`
- send:
```json
{_
    'userId': Number,
	'token': Number
}
```
- return:
-- success:
```json
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
-- fail:
```json
{'status': Number, 'error': String}
```
