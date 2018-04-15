const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id : '1',
			name : 'Anne',
			room : 'Node Course'
		}, {
			id : '2',
			name : 'Bill',
			room : 'React Course'
		}, {
			id : '3',
			name : 'Cathy',
			room : 'Node Course'
		}]

	});

	it('should add new users', () => {
		var users = new Users();
		var user = {
			id : '123',
			name : 'Steven',
			room : 'The Office Fans'
		}

		var res = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it('should remove a user', () => {
		var id = '2';
		var user = users.removeUser(id);
		expect(user.id).toBe(id);
	});

	it('should not remove a user', () => {
		var id = '490';
		var user = users.removeUser(id);
		expect(user).toBeFalsy();
	});

	it('should get a user', () => {
		var id = '2';
		var user = users.getUser(id);
		expect(user.id).toBe(id);
	});

	it('should not get a user', () => {
		var id = '400';
		var user = users.getUser(id);
		expect(user).toBeFalsy();
	});

	it('should return names for node course', () => {
		var room = 'Node Course';
		var res = users.getUserList(room);
		expect(res).toEqual(['Anne','Cathy']);
	});

	it('should return names for react course', () => {
		var room = 'React Course';
		var res = users.getUserList(room);
		expect(res).toEqual(['Bill']);
	});
});