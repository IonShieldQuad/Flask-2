from flask import Flask, render_template, request
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from requests import get
import urllib.parse
import languages

app = Flask("Flask-2")
app.config['SECRET_KEY'] = "sg16hs6h9ilm738fr5sgh54fkp0sw"


class TranslateForm(FlaskForm):
    translate_from = StringField('From ', validators=[DataRequired()])
    translate_to = StringField(' to ', validators=[DataRequired()])
    submit = SubmitField('Translate')


@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def index():
    form = TranslateForm()
    return render_template('translate.html', title='Translate', form=form)


@app.route('/translate', methods=['POST'])
def translate():
    translate_text = request.json['translate_text']
    translate_from = request.json['translate_from']
    translate_to = request.json['translate_to']
    if translate_from == '':
        translate_from = 'auto'

    out = ''
    if (translate_from == 'auto' or translate_from in languages.symbols) and \
            translate_to in languages.symbols and translate_text != '':
        url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + translate_from + '&tl=' + \
              translate_to + '&dt=t&q=' + urllib.parse.quote(translate_text)
        result = get(url)
        try:
            out = (result.json()[0][0][0])
        except ValueError:
            out = 'Too many requests, try again later.'
    return out


app.run(port=8080, host='127.0.0.1')
