import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import SearchPage from './pages/SearchPage'
import HistoryPage from './pages/HistoryPage'
import FavoritesPage from './pages/FavoritesPage'

function NavBar() {
    const location = useLocation()
    const pages = [
        { path: '/', label: '搜索' },
        { path: '/history', label: '历史' },
        { path: '/favorites', label: '收藏' },
    ]
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>Alex的字典</Typography>
                {pages.map(p => (
                    <Button
                        key={p.path}
                        color="inherit"
                        component={Link}
                        to={p.path}
                        sx={{ fontWeight: location.pathname === p.path ? 'bold' : 'normal', textDecoration: location.pathname === p.path ? 'underline' : 'none' }}
                    >
                        {p.label}
                    </Button>
                ))}
            </Toolbar>
        </AppBar>
    )
}

export default function App() {
    const [history, setHistory] = useState(() =>
        JSON.parse(localStorage.getItem('dict-history') || '[]')
    )
    const [favorites, setFavorites] = useState(() =>
        JSON.parse(localStorage.getItem('dict-favorites') || '[]')
    )

    const addToHistory = (meaning) => {
        const newHistory = [
            { meaning, timestamp: Date.now() },
            ...history.filter(h => h.meaning.word !== meaning.word)
        ]
        setHistory(newHistory)
        localStorage.setItem('dict-history', JSON.stringify(newHistory))
    }

    const toggleFavorite = (meaning) => {
        const isFav = favorites.some(f => f.word === meaning.word)
        const newFavs = isFav
            ? favorites.filter(f => f.word !== meaning.word)
            : [...favorites, meaning]
        setFavorites(newFavs)
        localStorage.setItem('dict-favorites', JSON.stringify(newFavs))
    }

    return (
        <BrowserRouter>
            <NavBar />
            <Toolbar />
            <Routes>
                <Route path="/" element={
                    <SearchPage
                        favorites={favorites}
                        addToHistory={addToHistory}
                        toggleFavorite={toggleFavorite}
                    />
                } />
                <Route path="/history" element={<HistoryPage history={history} />} />
                <Route path="/favorites" element={
                    <FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} />
                } />
            </Routes>
        </BrowserRouter>
    )
}
