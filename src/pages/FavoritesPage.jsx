import { useNavigate } from 'react-router-dom'
import {
    Box, Typography, List, ListItem, ListItemButton,
    ListItemText, IconButton, Divider
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

export default function FavoritesPage({ favorites, toggleFavorite }) {
    const navigate = useNavigate()

    if (favorites.length === 0) {
        return (
            <Box sx={{ maxWidth: '800px', margin: '0 auto', mt: '30px', textAlign: 'center' }}>
                <Typography color="text.secondary">暂无收藏</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ maxWidth: '800px', margin: '0 auto', mt: '30px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>我的收藏</Typography>
            <List disablePadding>
                {favorites.map((meaning, i) => (
                    <Box key={i}>
                        <ListItem
                            disablePadding
                            secondaryAction={
                                <IconButton edge="end" color="error" onClick={() => toggleFavorite(meaning)}>
                                    <FavoriteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemButton onClick={() => navigate('/', { state: { meaning } })}>
                                <ListItemText
                                    primary={meaning.word}
                                    secondary={meaning.phonetic || meaning.phonetics?.find(p => p.text)?.text}
                                />
                            </ListItemButton>
                        </ListItem>
                        {i < favorites.length - 1 && <Divider />}
                    </Box>
                ))}
            </List>
        </Box>
    )
}
