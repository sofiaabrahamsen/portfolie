from flask import Flask, app, render_template
from flask_session import Session

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

###################################
###################################
def _________GET_________(): pass
###################################
###################################
@app.get("/")
def view_index():
    return render_template("index.html")

@app.get("/contact")
def view_contact():
    return render_template("contact.html")

@app.get("/about")
def view_about():
    return render_template("about.html")

@app.get("/cv")
def view_cv():
    return render_template("cv.html")

##########################
if __name__ == "__main__":
    app.run(debug=True)
