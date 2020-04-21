from flask import Flask, render_template, url_for, request
from datetime import datetime
import MySQLdb.cursors

db = MySQLdb.connect(host='localhost', db='threenumbers', user='marc', passwd='123')
app = Flask(__name__)

@app.route("/", methods=['GET','POST'])
def home():
    if request.method == 'POST':
        req = request.form
        namee = req['namee']
        timee = req['timee']
        scoree = req['scoree']
        dict_cursor = db.cursor(MySQLdb.cursors.DictCursor)
        dict_cursor.execute('INSERT INTO highscore (namee,scoree,timee) VALUES (%s, %s, %s)', (namee, scoree, timee+"s"))
        db.commit()
        dict_cursor.close()
        return "<script>window.location.href='/';</script>"
    return render_template('threenum.html')

if __name__ == "__main__":
    app.run(debug=True)  
