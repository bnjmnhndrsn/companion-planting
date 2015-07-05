json.extract!(@garden, :id, :title, :height, :width)
json.plantings do
  json.array! @garden.plantings, partial: 'plantings/planting', as: :planting
end
