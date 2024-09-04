import pandas as pd
from flask import Flask, request, jsonify

app = Flask(__name__)

def get_pop_set(rentals,keyword):
        locations = list(set(rentals.cityLocation))
        cities = ['Aventura', 'Biscayne Park', 'Coral Gables', 'Hialeah', 'Miami', 'Miami Beach', 'Miami Gardens', 'Miami Shores', 'North Bay Village', 'North Miami', 'North Miami Beach', 'Opa-locka',
                'Cooper City', 'Dania Beach', 'Davie', 'Fort Lauderdale', 'Hallandale Beach', 'Hollywood', 'Oakland Park', 'Pembroke Pines', 'Plantation', 'Tamarac']

        city_rentals = rentals[rentals['cityLocation'].isin(cities)]
        group_rentals = city_rentals.groupby(keyword)['rating'].mean().sort_values(ascending=False)
        print('groups created')
        temp_df = pd.DataFrame(group_rentals).reset_index()

        for index, item in temp_df.iterrows():
                total_trips = rentals[(rentals[keyword] == item[keyword])]['completedTrips'].sum()
                temp_df.loc[index, 'trip_count'] = total_trips
        print('total trips retrieved')
        if keyword != 'avgDailyAmount':
                for index, item in temp_df.iterrows():
                        total_amt = rentals[(rentals[keyword] == item[keyword])]['avgDailyAmount'].sum()
                        temp_df.loc[index, 'avgDailyRate'] = total_amt
        return temp_df


@app.route('/get_popular_ranking', methods=['POST'])
def calculate_pop_set():
    try:
        data = request.get_json()
        print('data retrieved')
        rentals_df = pd.DataFrame(data['rentals'])
        keyword = data['keyword']
        print('dataframe ready')
        result = get_pop_set(rentals_df, keyword)
    except Exception as e:
        print(f"Error in calculate_pop_set: {e}")
        return jsonify({'error': str(e)}), 500
    return jsonify(result.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)