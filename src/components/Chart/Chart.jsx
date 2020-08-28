import React, {useState,useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line,Bar} from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({data: {confirmed,recovered,deaths},country}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();

    },[]);

    const lineChart = (
        //if data is avaible
            dailyData.length 
            ? (
            <Line
                data = {{
                labels: dailyData.map(({date}) => date),
                datasets:[{
                    data: dailyData.map(({confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor:'rgba(96, 67, 226, 0.7)',
                    fill:true,
                },{
                    data: dailyData.map(({deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: ' rgba(226, 67, 67,0.7)',
                    backgroundColor:' rgba(226, 67, 67,0.4)',
                    fill:true,

                }],
            }}
        />) : null
    );

    console.log(confirmed, recovered, deaths);


    const barChart = (
        confirmed
        ?(
            <Bar
                data= {{
                    labels: ['Infected','Recovered','Deaths'],
                    datasets:[{
                        label:'People',
                        backgroundColor: [
                            'rgba(96, 67, 226, 0.7)',
                            'rgba(67, 226, 128,0.7)',
                            'rgba(226, 67, 67,0.7)',
                        ],
                        data : [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: {display:false},
                    title: {display:true, text:`Current state in ${country}`},
                }}
            />
        ): null
    );



    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;

