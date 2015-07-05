class GardenSquaresController < ApplicationController
  def show
    @garden_square = GardenSquare.find(params[:id])
    if @garden_square
      render :show
    else
      render json: ["No garden!"], status: 404
    end
  end

  def create
    @garden_square = GardenSquare.new(garden_square_params)
    if @garden_square.save
      render :show
    else
      render json: @garden_square.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @garden_square = GardenSquare.find(params[:id])
    if @garden_square.update(garden_square_params)
      render :show
    else
      render json: @garden_square.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
    def garden_square_params
      parameters = params.permit(:id, :column, :row, :garden_id, plant: [:id])
      parameters[:plant_id] = parameters[:plant][:id] if parameters[:plant]
      parameters.delete(:plant)
      parameters
    end
end
