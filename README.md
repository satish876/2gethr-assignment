# ENDPOINTS

## 1. POST /rooms/addRoom

Sample request body
```
{
	"name": "Room 4",
	"numberOfSeats": 5,
	"floorNumber": "TF",
	"whiteboard": false,
	"roomPic": "www.google.com",
	"conference_cost_in_credits": true
}
```

### To add a new room


## 2. POST /room/bookRoom

### To book a slot

Sample request body
```
{
	"dateToBook": "29-07-2019",
	"roomId": "5d1cfd4a1b2a671a126cfad1",
	"userName": "Cosmo Kramer",
	"slotsRequired": [7,9]
}
```
## 3. GET /room

### To get all the rooms