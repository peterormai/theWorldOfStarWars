import psycopg2
import user
import os
import urllib


def fetch_database(query, tuple_parameters=None, fetch='all'):
    """Connects to the database to retrieve data, then
    returns it.
    First parameter: query
    Second parameter: parameters which you want to insert into your query, use tupple type
    Third parameter: fetch type, one or all, use string type
    """
    conn = None
    try:
        urllib.parse.uses_netloc.append('postgres')
        url = urllib.parse.urlparse(os.environ.get('DATABASE_URL'))

        conn = psycopg2.connect(
            database=url.path[1:],
            user=url.username,
            password=url.password,
            host=url.hostname,
            port=url.port
        )
        conn.autocommit = True
        # connect_str = "dbname={0} user={0} host='localhost' password={1}".format(user.username, user.password)
        # conn = psycopg2.connect(connect_str)
        # conn.autocommit = True
        cursor = conn.cursor()
        cursor.execute(query, tuple_parameters)
        if fetch == 'all':
            rows = cursor.fetchall()
        elif fetch == 'one':
            rows = cursor.fetchone()
        return rows

    except psycopg2.DatabaseError as exception:
        print(exception)

    finally:
        if conn:
            conn.close()


def modify_database(query, tuple_parameters=None):
    """Connects to the database then modifies the data
    without fetching anything.
    """
    cursor = None
    conn = None
    try:
        urllib.parse.uses_netloc.append('postgres')
        url = urllib.parse.urlparse(os.environ.get('DATABASE_URL'))
        conn = psycopg2.connect(
            database=url.path[1:],
            user=url.username,
            password=url.password,
            host=url.hostname,
            port=url.port
        )
        # connect_str = "dbname={0} user={0} host='localhost' password={1}".format(user.username, user.password)
        # conn = psycopg2.connect(connect_str)
        # conn.autocommit = True
        cursor = conn.cursor()
        conn.autocommit = True
        cursor.execute(query, tuple_parameters)

    except psycopg2.DatabaseError as exception:
        print(exception)

    finally:
        if conn:
            conn.close()


# ///////////////////////////////////////////////////
def register_new_user(user_name, password, email, registration_time):
    modify_database("""INSERT INTO swuser(username, password, email, registration_time)
                    SELECT '{}', '{}', '{}', '{}';""".format(user_name, password, email, registration_time))

# ///////////////////////////////////////////////////


def handle_question_like(question_id, like_value):
    """"Adds one or takes one from the question vote/like counter"""
    modify_database("""UPDATE question SET vote_number = vote_number + %s WHERE id = %s""", (like_value, question_id))


def handle_answer_like(answer_id, like_value):
    """"Adds one or takes one from the answer vote/like counter"""
    modify_database(
        """UPDATE answer SET vote_number = vote_number + %s WHERE id = %s""", (like_value, answer_id))


def get_all_users():
    """Shows all the registered users."""
    return fetch_database("""SELECT id, username, email, registration_time, role FROM users;""")

# #######################USER AUTHENTICATION########################


def check_user(username, password):
    """Selects user and password from the database"""
    return fetch_database("""SELECT role FROM users
                          WHERE username=%s AND password=%s;""", (username, password), 'one')


def creator_username(type_, id):
    """Checks the user with the user ID"""
    try:
        return fetch_database("""SELECT username FROM users
                              LEFT JOIN {0} ON users.id={0}.user_id
                              WHERE {0}.id=%s;""".format(type_), (id,), 'one')[0]
    except TypeError:
        return None


def creator_id(creator_username):
    """Selects the username of user which shall appear later"""
    return fetch_database("""SELECT id FROM users
                          WHERE username=%s;""", (creator_username,), 'one')[0]


def create_recovery_key(email):
    """Creates for the database a recovery key for specific user based on the email address"""
    recovery_key = password_generator(random.randint(50, 100))
    modify_database("""UPDATE users SET recovery_key=%s
                    WHERE email=%s;""", (recovery_key, email))
    return recovery_key


# Mit keres egy password generátor a queries fájlban????
def password_generator(length):
    """Generates a set of numbers and letters to create a unique new password"""
    char_set = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    password = ''
    for char in range(length):
        password += random.choice(char_set)
    return password


def save_recovery_password(recovery_key, password):
    """Replaces the old recovery key with the password as well"""
    modify_database("""UPDATE users SET password=%s
                    WHERE recovery_key=%s;""", (password, recovery_key))


def get_user_email(recovery_key):
    """Selects the user email"""
    return fetch_database("""SELECT email FROM users
                          WHERE recovery_key=%s""", (recovery_key,), 'one')[0]

# print(get_user_email('MY1ht2kBa1brud3aHdmQZWttHHw3oev4LI2BoQE253HaRV4WMGgMIJ8l5cDSoCktv0KceAyW1b2HI'))


def get_username(recovery_key):
    """Gets username for the recovery key"""
    return fetch_database("""SELECT username FROM users
                          WHERE recovery_key=%s""", (recovery_key,), 'one')[0]


def change_password(username, old_password, new_password):
    """Replaces old password with the new password for the user"""
    modify_database("""UPDATE users SET password=%s
                    WHERE username=%s AND password=%s;""", (new_password, username, old_password))


def null_recovery_keys(recovery_key):
    modify_database("""
                    UPDATE users
                    SET recovery_key = 0
                    WHERE recovery_key=%s
                    """, (recovery_key,))


def update_username(user_id, new_username):
    return modify_database("""
                            UPDATE users
                            SET username=%s
                            WHERE id=%s
                            """, (new_username, user_id))


def update_password(user_id, new_password):
    return modify_database("""
                            UPDATE users
                            SET password=%s
                            WHERE id=%s
                            """, (new_password, user_id))


def update_email(user_id, new_email):
    return modify_database("""
                            UPDATE users
                            SET email=%s
                            WHERE id=%s
                            """, (new_email, user_id))


def update_role(user_id, new_role):
    return modify_database("""
                            UPDATE users
                            SET role=%s
                            WHERE id=%s
                            """, (new_role, user_id))


def get_user_detail(user_id):
    return fetch_database("""SELECT username, email, role
                            FROM users
                            WHERE id = %s
                            """, (user_id))[0]


def delete_user(user_id):
    modify_database("""
                        DELETE
                        FROM users
                        WHERE id=%s
                        """, (user_id))
