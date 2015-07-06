json.partial! 'gardens/garden', garden: @garden
json.plantings do
  json.array! @garden.plantings, partial: 'plantings/planting', as: :planting
end
