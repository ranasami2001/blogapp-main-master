<?php
	include 'config/db_config.php';

	$data = file_get_contents("php://input");

	$request = json_decode($data);

	$response = array();

	$isValidRequest = false;

	//{"action":"REGISTER_USER","userName":"Mr. Ahmed"}

	//REGISTER_USER
	//ADD_BLOG
	//GET_BLOGS
	//UPDATE_BLOG
	//DELETE_BLOG

	if(isset($request->{'action'})){
		if($request->{'action'} == 'REGISTER_USER'){
			$isValidRequest = true;	

			$userName = $request -> {'userName'};
			$query = "INSERT INTO user(`name`) values('".$userName."')";
			$result = mysqli_query($connection,$query);
			if($result){
				$response['userId'] = mysqli_insert_id($connection);
				$response['status'] = true; 
				$response['responseCode'] = 0; //success
				$response['message'] ="User registered successfully";
			}
			else{
				$response['status'] = false; 
				$response['responseCode'] = 102; //User registration failed
				$response['message'] ="User registration failed";
			}
		}

		if($request->{'action'} == 'ADD_BLOG'){
			$isValidRequest = true;	

			$userId = $request -> {'userId'};
			$title = $request -> {'title'};
			$description = $request -> {'description'};

			$query = "INSERT INTO blog(`title`,`description`,`user_id`) values('".$title."','".$description."','".$userId."')";
			$result = mysqli_query($connection,$query);
			if($result){
				$response['blogId'] = mysqli_insert_id($connection);
				$response['status'] = true; 
				$response['responseCode'] = 0; //success
				$response['message'] ="Blog inserted successfully";
			}
			else{
				$response['status'] = false; 
				$response['responseCode'] = 103; //Blog insertion failed
				$response['message'] ="Blog insertion failed";
			}

		}

		if($request->{'action'} == 'GET_BLOGS'){
			$isValidRequest = true;	
            $userId = $request -> {'userId'};

			$query = "SELECT b.id as blogId, u.id as userId, b.date_time as blogDateTime,u.date_time as userDateTime,b.*,u.* FROM blog b INNER JOIN user u on b.user_id = u.id";
			$result = mysqli_query($connection,$query);
			if($result && mysqli_num_rows($result)>0){
				$myBlogs = array();
				$allBlogs = array();
				while(($row = mysqli_fetch_assoc($result))!=null){
					$blog = array();
					$blog["blogId"] = $row['blogId'];
					$blog["bloggerName"] = $row['name'];
					$blog["title"] = $row['title'];
					$blog["description"] = $row['description'];
					$blog["dateTime"] = $row['blogDateTime'];

					$allBlogs[] = $blog;

					if($row['userId'] == $userId){
						$myBlogs[] =  $blog;
					}
				}

				$response['status'] = true; 
				$response['responseCode'] = 0; //Blogs are available
				$response['message'] ="Blogs are available";
				$response['allBlogs'] =  $allBlogs;
				$response['myBlogs']  = $myBlogs;
			}
			else{
				$response['status'] = false; 
				$response['responseCode'] = 104; //Blogs are not available
				$response['message'] ="Blogs are not available";
			}
		}
		
		if($request->{'action'} == 'UPDATE_BLOG'){
			$isValidRequest = true;	

			$userId = $request -> {'userId'};
			$blogId = $request -> {'blogId'};
			$title = $request -> {'title'};
			$description = $request -> {'description'};

			$query = "UPDATE blog SET title='".$title."',description='".$description."' WHERE id='".$blogId."'";
			$result = mysqli_query($connection,$query);
			if($result){
				$response['blogId'] = $blogId;
				$response['status'] = true; 
				$response['responseCode'] = 0; //success
				$response['message'] ="Blog updated successfully";
			}
			else{
				$response['status'] = false; 
				$response['responseCode'] = 105; //Blog updation failed
				$response['message'] ="Blog updation failed";
			}

		}

		if($request->{'action'} == 'DELETE_BLOG'){
			$isValidRequest = true;	

			$userId = $request -> {'userId'};
			$blogId = $request -> {'blogId'};

			$query = "DELETE FROM blog WHERE id='".$blogId."'";

			$result = mysqli_query($connection,$query);
			if($result){
				$response['blogId'] = $blogId;
				$response['status'] = true; 
				$response['responseCode'] = 0; //success
				$response['message'] ="Blog deleted successfully";
			}
			else{
				$response['status'] = false; 
				$response['responseCode'] = 106; //Blog deletion failed
				$response['message'] ="Blog deletion failed";
			}
		}

		if(!$isValidRequest){
			$response['status'] = false; 
			$response['responseCode'] = 101; //Invalid request action
			$response['message'] ="Invalid request action";
		}

	}
	else{
		$response['status'] = false; 
		$response['responseCode'] = 100; //Request action not defined
		$response['message'] ="Request action not defined";
	}

	echo json_encode($response);

?>