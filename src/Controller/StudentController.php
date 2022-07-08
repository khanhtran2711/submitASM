<?php

namespace App\Controller;

use App\Entity\Student;
use App\Entity\Submission;
use App\Form\StudentForm;
use App\Repository\GroupRepository;
use App\Repository\StudentRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

date_default_timezone_set('Asia/Ho_Chi_Minh');
class StudentController extends AbstractController
{

    /**
     * @Route("/", name="welcome")
     */
    public function welcome(): Response
    {
        return $this->render('welcome.html.twig', []);
    }
    /**
     * @Route("/add/student", name="app_student")
     */
    public function index(ManagerRegistry $res, Request $req): Response
    {
        $std = new Student();
        $stdForm = $this->createForm(StudentForm::class,$std);


        $stdForm->handleRequest($req);
        $entity = $res->getManager();

        if($stdForm->isSubmitted() && $stdForm->isValid()){
            $data = $stdForm->getData();
            $std->setName($data->getName());
            $std->setCode($data->getCode());
            $std->setGr($data->getGr());

            $entity->persist($std);
            $entity->flush();

            return $this->redirectToRoute('app_student');
        }

        return $this->render('student/index.html.twig', [
            'form' => $stdForm->createView()
        ]);
    }

    /**
     * @Route("/submit", name="submit_form",methods={"GET"})
     */
    public function submitAction(ManagerRegistry $res, Request $req,StudentRepository $repo,SluggerInterface $slugger ): Response
    {
        //check your deadline, and your group (allow)
        $group = 2;
        return $this->render('submit/index2.html.twig', ['group'=>$group]);
    }

     /**
     * @Route("/submit", name="submit_add",methods={"POST"})
     */
    public function addSubmitAction(Request $req, SluggerInterface $slugger,
    StudentRepository $repo, ManagerRegistry $reg,GroupRepository $grRepo): Response
    {
        $statusMsg = "";
        $status = 'false'; 
        $newFilename = "";
        
        $reqNormal = $req;
        
        $req = $this->tranform($req);
        $code = $req->request->get('code');
        $link = $req->request->get('link');
        $groupID = $req->request->get('group');
        $group = $grRepo->find($groupID);
        $submit = new Submission();
        $student = $repo->findOneBy(['code'=>$code,'gr'=>$group]);
        if(!$student){
            $statusMsg = "Student code is invalid or this link is not for you :(";
        }
        else if(!preg_match("~^(https?:\/\/)?github.com\/.*~", $link)){
            $statusMsg = "Link github is invalid";
        }else{
            $submit->setStd($student);
            $submit->setGitHubLink($link);
            $submit->setCreatedAt(new \DateTime());
            
                if ($reqNormal->files->has('file')) {
                    $file = $reqNormal->files->get('file');
                    $content = file_get_contents($_FILES['file']['tmp_name']);
                    $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                    //  SluggerInterface $slugger
                    $safeFilename = $slugger->slug($originalFilename);
                    $newFilename = $safeFilename.'-'.$code.'-'.uniqid().'.'.$file->guessExtension();
                    $type = $file->getMimeType();
                    $size = $file->getSize();
                    // Move the file to the directory where brochures are stored
                    try {
                        $file->move(
                            $this->getParameter('file_dir'),
                            $newFilename
                        );
                    } catch (FileException $e) {
                        echo $e;
                    }
                    $submit->setFileUrl($newFilename);
                    
                    $fileDir = $this->getParameter('file_dir') . "/" . $newFilename;
                    // $blob = addslashes(file_get_contents());
                    $submit->setType($type);
                    $submit->setSize($size);
                    $submit->setContent($content);
                }
                if($req->request->has('linkdoc')){
                    $filelink = $req->request->get('linkdoc');
                    $submit->setFileUrl($filelink);
                }

            $status = true;
            $entity = $reg->getManager();
            $entity->persist($submit);
            $entity->flush();
        }
        
        
        if($status==true){
            return $this->json([
                'status' => $status,
                // 'code'=>$code,
                // 'link' => $link,
                // 'fileUrl' => $newFilename,
                'statusMsg' => $statusMsg,
                // 'type' => $submit->getType(),
                // 'size' =>$submit->getSize(),
            ]);
        }
        else{
            return $this->json([
                'status' => $status,
                'statusMsg' => $statusMsg
            ]);
        }
    }

    public function tranform(Request $re){
        $data = json_decode($re->getContent(), true);
        if($data === null){
            return $re;
        }
        $re->request->replace($data);
        return $re;
    }

    /**
     * @Route("/student", name="student_show",methods={"GET"})
     */
    public function showAction(StudentRepository $repo,GroupRepository $grRepo): Response
    {
        $group = $grRepo->find(2);
        $students = $repo->findBy(['gr'=>$group]);

        $data = [];

        foreach($students as $s){
            $data[] = [
                'code' => $s->getCode()
            ];
        }
        return $this->json($data);
    }

    /**
     * @Route("/admin/getphoto/{filename}", name="get_photo")
     */
    public function getPhoto($filename) {
        $file = $this->getParameter('img_dir') . '/' . $filename;
        $response = new Response();
        $response->headers->set('Content-Type', 'image/jpg');
        $response->setContent(file_get_contents($file));
        return $response;
    }
    // /**
    //  * @Route("/callDrive", name="callDrive")
    //  */
    // public function callDrive()
    // {
    //     $googleOauthURL = 'https://accounts.google.com/o/oauth2/auth?scope=' . urlencode(GoogleDriveApi::GOOGLE_OAUTH_SCOPE) . '&redirect_uri=' . GoogleDriveApi::REDIRECT_URI . '&response_type=code&client_id=' . GoogleDriveApi::GOOGLE_CLIENT_ID . '&access_type=online'; 
        
    //     // header("Location: $googleOauthURL"); 

    //     return new RedirectResponse($googleOauthURL);
    // }

}
