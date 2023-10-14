import requests
import json
import pymongo


base_url = "http://localhost:3001/whiteboard/"
new_board_name = "verynewx"
existing_board_name = "meeting"

class TestWhiteBoardAPI:
    @classmethod
    def setup_class(cls):
        client = pymongo.MongoClient("mongodb://admin:password@localhost:27017")
        whiteboards = client['figmaX']['whiteboards']
        whiteboards.delete_many({})
        whiteboards.insert_one({
            "boardName": existing_board_name,
            "items":  []
        })

    @classmethod
    def teardown_class(cls):
        client = pymongo.MongoClient("mongodb://admin:password@localhost:27017")
        whiteboards = client['figmaX']['whiteboards']
        whiteboards.delete_many({})

    def test_get_existing_board(self):
        response = requests.get(url=base_url+existing_board_name)
        data = json.loads(response.text)
        assert response.status_code == 200
        assert data['boardName'] == existing_board_name
        assert data['items'] == []

    def test_get_nonexistent_board(self):
        response = requests.get(url=base_url + "nonexistent_board_name")
        assert response.status_code == 404

    def test_delete_existing_board(self):
        response = requests.delete(url=base_url + existing_board_name)
        assert response.status_code == 200

        get_response = requests.get(url=base_url + existing_board_name)
        assert get_response.status_code == 404

    def test_delete_nonexistent_board(self):
        response = requests.delete(url=base_url + "nonexistent_board_name")
        assert response.status_code == 404




