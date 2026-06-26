import { Box, Chip, Paper, Stack, Typography } from "@mui/material"

const readStateStyles = {
  read: {
    backgroundColor: "rgba(14, 165, 233, 0.08)",
    borderColor: "rgba(14, 165, 233, 0.22)",
  },
  unread: {
    backgroundColor: "rgba(255, 255, 255, 0.86)",
    borderColor: "rgba(15, 23, 42, 0.08)",
  },
}

export function NotificationCard({ notification }) {
  const { title, message, category, read, createdAt } = notification

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid",
        ...readStateStyles[read ? "read" : "unread"],
      }}
    >
      <Stack spacing={1}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} color="text.primary">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              {message}
            </Typography>
          </Box>
          <Chip label={category} size="small" variant="outlined" />
        </Stack>
        <Typography variant="caption" color="text.secondary">
          {new Date(createdAt).toLocaleString()}
        </Typography>
      </Stack>
    </Paper>
  )
}