from flask import Flask, render_template
app = Flask(__name__)


@app.route("/")
def main_page():
    table_headers = ["Name", "Diameter in km", "Climate", "Terrain",
                     "Surface water percentage", "Population", "Residents"]
    residents_headers = ['Name', 'Heights (m)', 'Mass (kg)', 'Skin color',
                         'Hair color', 'Eye color', 'Birth year', 'Gender']
    return render_template('main.html', table_headers=table_headers, residents_headers=residents_headers)


@app.errorhandler(404)
def page_not_found(e):
    """
    Error handling for wrong DNS address request.
    """
    return render_template('404.html')

# /////////////////// LOGIN SYSTEM /////////////////////////


@app.route('/register')
# @not_with_login
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
    user_name = request.form["usrname"]
    password = request.form["pass"]
    email = request.form["mail"]
    queries.register_new_user(user_name, password, email, registration_time)
    return redirect('/')


# //////////////////////////////////////////////////////////

def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
