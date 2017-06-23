from flask import Flask, render_template
app = Flask(__name__)


@app.route("/")
def main_page():
    table_headers = ["Name", "Diameter in km", "Climate", "Terrain",
                     "Surface water percentage", "Population in formatted way", "Residents"]
    return render_template('main.html', table_headers=table_headers)


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
