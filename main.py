from flask import Flask, render_template, request, redirect, url_for, session, flash
from functools import wraps
import queries
from datetime import datetime


app = Flask(__name__)


@app.route("/")
def main_page():
    table_headers = ["Name", "Diameter", "Climate", "Terrain",
                     "Surface water", "Population", "Residents"]
    residents_headers = ['Name', 'Heights', 'Mass', 'Skin color',
                         'Hair color', 'Eye color', 'Birth year', 'Gender']
    return render_template('main.html', table_headers=table_headers, residents_headers=residents_headers)


@app.errorhandler(404)
def page_not_found(e):
    """
    Error handling for wrong DNS address request.
    """
    return render_template('404.html')


# /////////////////// LOGIN SYSTEM /////////////////////////
app.config.update(
    SECRET_KEY='123124124512312'
)


def not_with_login(function):
    @wraps(function)
    def wrap(*args, **kwargs):
        if session.get("role"):
            return redirect(url_for('main_page'))
        else:
            return function(*args, **kwargs)
    return wrap


def login_required(function):
    @wraps(function)
    def wrap(*args, **kwargs):
        if session.get("role") == 'user' or session.get("role") == 'admin':
            return function(*args, **kwargs)
        else:
            flash('You need to login')
            return redirect(url_for('login'))
    return wrap


@app.route('/register')
@not_with_login
def new_registration():
    """
    Points to the registration page.
    """
    return render_template('registration.html')


@app.route('/registration', methods=["POST"])
def registration():
    """
    When user data sent from the website, it creates a new database row in users table.
    """
    registration_time = str(datetime.now())[:-7]
    user_name = request.form["username"]
    password = request.form["pass"]
    email = request.form["mail"]
    queries.register_new_user(user_name, password, email, registration_time)
    return redirect('/')


@app.route("/login", methods=["GET", "POST"])
@not_with_login
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user_check = queries.check_user(username, password)
        if user_check is not None:
            session['username'] = username
            session['role'] = user_check[0]
            return redirect(url_for('main_page'))
        else:
            return redirect(redirect_url())
    else:
        return render_template('login.html')


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('main_page'))


def redirect_url(default='index'):
    """
    It redirects to the previous page.
    """
    return request.args.get('next') or \
        request.referrer or \
        url_for(default)


# //////////////////////////////////////////////////////////

def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
