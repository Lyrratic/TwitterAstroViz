from flask import Flask, render_template, request   # for running the Flask server
import sys                                          # for obtaining command line arguments

app = Flask(__name__)
app.debug=True

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/stats')
def stats():
    return render_template('stats.html')

@app.route('/organizations-interactions') #overview of organization stats
def organizations_interactions():
    return render_template('organizations-interactions.html')

@app.route('/individuals-interactions') #who is following, two types of chord diagrams
def individuals_interactions():
    return render_template('individuals-interactions.html')

@app.route('/hashtags') #word bubbles of hashtags
def hashtags():
    return render_template('hashtags.html')

@app.route('/maps') #maps of followers
def maps():
    return render_template('maps.html')

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print "USAGE: python telecorrelator.py [port #]"
    else:
        app.run(port = int(sys.argv[1])) # run on the specified port number
