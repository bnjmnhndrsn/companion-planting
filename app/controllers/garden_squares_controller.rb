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
      params[:garden_square].permit(:column, :row, :garden_id, :plant_id)
    end
end
