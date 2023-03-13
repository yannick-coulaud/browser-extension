import { UniverseTypeId } from '../enum/UniverseTypeId'
import { VideoType } from '../enum/VideoType'

export const getVideoType = (typeId: number): VideoType => {
  return typeId === UniverseTypeId.MOVIE ? VideoType.MOVIE : VideoType.TVSHOW
}
