import {
    Card, CardHeader, CardContent,
    Typography, Chip, Divider, Box, IconButton
} from '@mui/material'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export default function ResultCard({ meaning, isFavorite, onToggleFavorite }) {
    const audioUrl = meaning.phonetics?.find(p => p.audio)?.audio

    const playAudio = () => {
        if (audioUrl) new Audio(audioUrl).play()
    }

    return (
        <Card sx={{ mt: 3 }}>
            <CardHeader
                title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h5" fontWeight="bold">
                            {meaning.word}
                        </Typography>
                        {audioUrl && (
                            <IconButton onClick={playAudio} size="small" color="primary">
                                <VolumeUpIcon />
                            </IconButton>
                        )}
                        <IconButton onClick={() => onToggleFavorite(meaning)} size="small" color="error">
                            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                    </Box>
                }
                subheader={
                    <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        {meaning.phonetic || meaning.phonetics?.find(p => p.text)?.text}
                    </Typography>
                }
            />
            <Divider />
            <CardContent>
                {meaning.meanings.map((m, i) => (
                    <Box key={i} sx={{ mb: 3 }}>
                        <Chip
                            label={m.partOfSpeech}
                            color="primary"
                            size="small"
                            sx={{ mb: 1.5 }}
                        />
                        {m.definitions.map((def, j) => (
                            <Box key={j} sx={{ display: 'flex', gap: 1.5, mb: 1 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 20 }}>
                                    {j + 1}.
                                </Typography>
                                <Box>
                                    <Typography variant="body1">{def.definition}</Typography>
                                    {def.example && (
                                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mt: 0.5 }}>
                                            "{def.example}"
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        ))}
                        {i < meaning.meanings.length - 1 && <Divider sx={{ mt: 2 }} />}
                    </Box>
                ))}
            </CardContent>
        </Card>
    )
}
