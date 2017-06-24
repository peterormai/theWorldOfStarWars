from flask import Flask, render_template
app = Flask(__name__)


@app.route("/")
def main_page():
    table_headers = ["Name", "Diameter in km", "Climate", "Terrain",
                     "Surface water percentage", "Population", "Residents"]
    residents_headers = ['Name', 'Heights (m)', 'Mass (kg)', 'Skin color',
                         'Hair color', 'Eye color', 'Birth year', 'Gender']
    return render_template('main.html', table_headers=table_headers, residents_headers=residents_headers)


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
