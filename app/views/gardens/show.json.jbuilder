json.extract!(@garden, :id, :title, :height, :width)
json.garden_squares do 
  json.array! @garden.garden_squares, partial: 'garden_square/garden_square', as: :garden_square
end
