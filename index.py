from flask import Flask, render_template, url_for, request
from datetime import datetime
import MySQLdb.cursors

db = MySQLdb.connect(host='localhost', db='threenumbers', user='marc', passwd='123')
app = Flask(__name__)

@app.route("/", methods=['GET','POST'])
def home():
    dict_cursor = db.cursor(MySQLdb.cursors.DictCursor)
    if request.method == 'POST':
        req = request.form
        namee = req['namee']
        timee = req['timee']
        scoree = req['scoree']
        dict_cursor.execute('INSERT INTO highscore (namee,scoree,timee) VALUES (%s, %s, %s)', (namee, scoree, timee))
        db.commit()
        dict_cursor.close()
        return "<script>window.location.href='/';</script>"
    dict_cursor.execute("select * from highscore ORDER BY scoree ASC, timee ASC")
    highscores = dict_cursor.fetchall()[:10]
    return render_template('threenum.html', highscores=highscores)

if __name__ == "__main__":
    app.run(debug=True)  
