import { useNavigate } from 'react-router-dom'
import {
    Box, Typography, List, ListItem, ListItemButton,
    ListItemText, Divider
} from '@mui/material'

export default function HistoryPage({ history }) {
    const navigate = useNavigate()

    if (history.length === 0) {
        return (
            <Box sx={{ maxWidth: '800px', margin: '0 auto', mt: '30px', textAlign: 'center' }}>
                <Typography color="text.secondary">暂无搜索历史</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ maxWidth: '800px', margin: '0 auto', mt: '30px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>搜索历史</Typography>
            <List disablePadding>
                {history.map((item, i) => (
                    <Box key={i}>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/', { state: { meaning: item.meaning } })}>
                                <ListItemText
                                    primary={item.meaning.word}
                                    secondary={new Date(item.timestamp).toLocaleString()}
                                />
                            </ListItemButton>
                        </ListItem>
                        {i < history.length - 1 && <Divider />}
                    </Box>
                ))}
            </List>
        </Box>
    )
}
