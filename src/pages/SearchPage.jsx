import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, TextField, Button, Alert } from '@mui/material'
import ResultCard from '../components/ResultCard'

export default function SearchPage({ favorites, addToHistory, toggleFavorite }) {
    const location = useLocation()
    const [word, setWord] = useState('')
    const [meaning, setMeaning] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (location.state?.meaning) {
            setMeaning(location.state.meaning)
            setWord(location.state.meaning.word)
            setError(false)
        }
    }, [location.state])

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(response => response.json())
            .then(data => {
                if (data.title) {
                    setError(true)
                    setMeaning(null)
                } else {
                    setError(false)
                    setMeaning(data[0])
                    addToHistory(data[0])
                }
            })
    }

    const isFavorite = meaning ? favorites.some(f => f.word === meaning.word) : false

    return (
        <Box sx={{ maxWidth: '800px', margin: '0 auto', mt: '30px' }}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', gap: '10px', width: 'fit-content', margin: '0 auto', alignItems: 'center' }}
            >
                <TextField
                    label="英文单词"
                    value={word}
                    onChange={e => setWord(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" size="large">查询</Button>
            </Box>

            {meaning && !error && (
                <ResultCard
                    meaning={meaning}
                    isFavorite={isFavorite}
                    onToggleFavorite={toggleFavorite}
                />
            )}

            {error && <Alert severity="error" sx={{ mt: 2 }}>未找到单词</Alert>}
        </Box>
    )
}
