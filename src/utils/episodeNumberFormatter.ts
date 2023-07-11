export const episodeNumberFormatter = (episodeNumber: number, maxEpisodes: number) => {
    return `${episodeNumber.toString().padStart(maxEpisodes.toString().length, '0')}`;
}
