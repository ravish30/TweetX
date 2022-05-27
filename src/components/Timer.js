import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'

function Timer(props) {

    const [days, setDays] = useState('00')
    const [hours, setHours] = useState('00')
    const [minutes, setMinutes] = useState('00')
    const [seconds, setSeconds] = useState('00')


    const [time, setTime] = useState('just now')

    function makeTimer() {
        const d = new Date(props.Time)
        var final = d.getTime();
        var now = new Date().getTime();

        var diff = now - final;

        var days = Math.floor(diff / (60 * 60 * 24 * 1000))
        var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        var seconds = Math.floor((diff % (1000 * 60)) / (1000))

        setDays(days)
        setHours(hours)
        setMinutes(minutes)
        setSeconds(seconds)


        if (days) {
            setTime(days + ' day ago')
        }
        else if (hours) {
            setTime(hours + ' hour ago')
        }
        else if (minutes) {
            setTime(minutes + ' min ago')
        }
        else if (seconds) {
            setTime(seconds + ' sec ago')
        }

    }

    useEffect(() => {
        makeTimer();
    }, [])

    return (
        <>
            <Typography color="primary" variant='div' sx={{ fontSize: '14px' }}>{time}</Typography>

        </>
    )
}

export default Timer
