import psycopg2
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

        cursor = conn.cursor()
        conn.autocommit = True
        cursor.execute(query, tuple_parameters)

    except psycopg2.DatabaseError as exception:
        print(exception)

    finally:
        if conn:
            conn.close()


def register_new_user(user_name, password, email, registration_time):
    modify_database("""INSERT INTO swuser(username, password, email, registration_time)
                    SELECT '{}', '{}', '{}', '{}';""".format(user_name, password, email, registration_time))


def check_user(username, password):
    """Selects user and password from the database"""
    return fetch_database("""SELECT role FROM swusers
                          WHERE username=%s AND password=%s;""", (username, password), 'one')
